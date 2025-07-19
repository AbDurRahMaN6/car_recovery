<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TowingRequest;

class TowingRequestController extends Controller
{
    public function index()
    {
        return response()->json(TowingRequest::all(), 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'customer_name' => 'required|string|max:255',
                'location' => 'nullable|string|max:255',
                'latitude' => 'required|numeric|between:-90,90',
                'longitude' => 'required|numeric|between:-180,180',
                'note' => 'nullable|string',
            ]);

            $towingRequest = TowingRequest::create($validated);

            return response()->json([
                'message' => 'Request created successfully',
                'data' => $towingRequest
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating towing request: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}